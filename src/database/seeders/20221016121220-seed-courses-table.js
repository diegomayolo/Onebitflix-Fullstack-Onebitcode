'use strict';

module.exports = {
  async up ( queryInterface, Sequelize )
  {
    const [categories] = await queryInterface.sequelize.query( 'SELECT id FROM categories;' )

    await queryInterface.bulkInsert('courses', [
      { name: 'Programador Full-stack Javascript', synopsis: 'Aprenda com projetos reais que vão além do teoria e te colocam frente a frente com os códigos já nas primeiras aulas! Vá do básico ao profissional sem perda de tempo (mesmo que você seja completamente iniciante) e esteja dentro de uma das áreas mais promissoras para o futuro, a programação!', featured: true, category_id: categories[0].id, created_at: new Date(), updated_at: new Date() },
      { name: 'Dominando a Linguagem Ruby', synopsis: 'Neste curso nós vamos entrar fortemente nos aspectos da Orientação a Objetos usando a linguagem Ruby como padrão no decorre de todo curso. Vamos aprender como programar em uma linguagem totalmente diferente dos padrões de outras linguagens do mercado e elevar a complexidade nos códigos dos seus scripts sem dores de cabeça usando puramente o diamante.', category_id: categories[0].id, created_at: new Date(), updated_at: new Date() },
      { name: 'Micro-serviços com Node.js', synopsis: 'Aprenda a desenvolver aplicações Nodejs modernas, utilizando o framework NestJS em conjunto com serviços Cloud robustos e escaláveis', featured: true, category_id: categories[0].id, created_at: new Date(), updated_at: new Date() },
      { name: 'Criando APIs Profissionais com Ruby on Rails', synopsis: 'Aprenda a criar uma aplicação completa com Ruby on Rails API-only e versionar uma aplicação Rails API', featured: true, category_id: categories[0].id, created_at: new Date(), updated_at: new Date() },
      { name: 'TDD na Prática: Testando APIs Node.js', synopsis: 'Utilize o TDD para desenvolver um gerenciador financeiro com a segurança dos testes automatizados sempre a seu lado', featured: true, category_id: categories[0].id, created_at: new Date(), updated_at: new Date() },
      { name: 'TDD na Prática: Testando Aplicações React', synopsis: 'Você aprenderá como é o funcionamento e o desenvolvimento guiado por testes na criação de um componente React.', featured: true, category_id: categories[1].id, created_at: new Date(), updated_at: new Date() },
      { name: 'Especialista Front-end: Vue.js', synopsis: 'Aprenda a criar aplicações com Vue Js do zero ao avançado e sistemas completos com rotas, estados isolado, componentes', category_id: categories[1].id, created_at: new Date(), updated_at: new Date() },
      { name: 'Criando Sites e Apps 3D com Three.js', synopsis: 'Aprenda os fundamentos da programação de gráficos em 3D com JavaScript.', category_id: categories[1].id, created_at: new Date(), updated_at: new Date() },
      { name: 'Dominando o Bootstrap 5', synopsis: 'Aprenda a construir sites atrativos com o framework CSS e JavaScript mais popular', category_id: categories[1].id, created_at: new Date(), updated_at: new Date() },
      { name: 'Visual Studio Code para Programadores Javascript', synopsis: 'Eleve sua produtividade no VS Code ao nível máximo, conheça as melhores extensões e técnicas para produzir mais código!', category_id: categories[2].id, created_at: new Date(), updated_at: new Date() },
      { name: 'Comandos do Terminal Linux: Um Guia Completo', synopsis: 'Aprenda a utilizar os comandos do terminal do Linux.', category_id: categories[2].id, created_at: new Date(), updated_at: new Date() },
      { name: 'Comunicação e Trabalho em Equipe', synopsis: 'Descubra como promover interações de qualidade na sua equipe de trabalho e conheça os principais efeitos que a falta de trabalho em equipe traz para a sua organização', category_id: categories[3].id, created_at: new Date(), updated_at: new Date() },
      { name: 'Programador Nômade', synopsis: 'Imagina o seguinte cenário: você acorda de manhã, abre a janela, vê uma paisagem agradável e se lembra que está em um país totalmente diferente. Pois bem, esse curso vai te levar para esse nível.', featured: true, category_id: categories[4].id, created_at: new Date(), updated_at: new Date() },
      { name: 'O Guia do Programador Freelancer', synopsis: 'Este guia é voltado àqueles que já decidiram seguir o caminho freelance/autônomo.', category_id: categories[4].id, created_at: new Date(), updated_at: new Date() },
    ])
  },

  async down ( queryInterface, Sequelize )
  {
    await queryInterface.bulkDelete( 'courses', null, {} )
  }
};