#!/usr/bin/perl
# Mini serveur statique de développement (alternative à python3 -m http.server).
# Usage : perl outils/serveur.pl [port]   (à lancer depuis la racine du site)
use strict;
use warnings;
use HTTP::Daemon;
use HTTP::Status;
use URI::Escape;
use File::Spec;
use Cwd qw(abs_path);

my $port = shift || 8000;
my $root = abs_path('.');
my %types = (
  html => 'text/html; charset=utf-8', css => 'text/css; charset=utf-8',
  js => 'application/javascript; charset=utf-8', json => 'application/json',
  svg => 'image/svg+xml', png => 'image/png', jpg => 'image/jpeg', ico => 'image/x-icon',
);

my $d = HTTP::Daemon->new(LocalAddr => '127.0.0.1', LocalPort => $port, ReuseAddr => 1)
  or die "Impossible d'écouter sur le port $port\n";
$| = 1;
print "Serveur : http://localhost:$port/\n";

$SIG{CHLD} = "IGNORE";
while (my $c = $d->accept) {
  my $pid = fork();
  if (!defined $pid || $pid) { $c->close; next; }  # parent : connexion suivante
  while (my $r = $c->get_request) {
    my $path = uri_unescape($r->uri->path);
    $path .= 'index.html' if $path =~ m{/$};
    my $file = abs_path(File::Spec->catfile($root, $path));
    if (!$file || index($file, $root) != 0 || !-f $file) {
      print "404 $path\n";
      $c->send_error(RC_NOT_FOUND);
      next;
    }
    my ($ext) = $file =~ /\.(\w+)$/;
    open(my $fh, '<:raw', $file) or do { $c->send_error(RC_FORBIDDEN); next };
    local $/; my $body = <$fh>; close $fh;
    my $res = HTTP::Response->new(200);
    $res->header('Content-Type' => $types{lc($ext // '')} // 'application/octet-stream');
    $res->header('Cache-Control' => 'no-store');
    $res->content($body);
    $c->send_response($res);
    print "200 $path\n";
  }
  $c->close;
  exit 0;
}
