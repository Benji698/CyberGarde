/* Script de la page salaries/quiz.html (séparé du HTML pour permettre une politique CSP stricte). */
QuizEngine.mount(document.getElementById('quiz'), {
  questions: window.DATA_SALARIES_QUIZ,
  storeKey: 'salaries.quiz',
  backHref: 'index.html',
  backLabel: 'Retour au parcours'
});
