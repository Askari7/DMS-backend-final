"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "departments",
      [
        {
            id:1, 
            companyId:1, 
            authorId:1, 
            authorName:'Shoaib Mustafa', 
            title:'Project Management', 
            suffix:'PM',
            createdAt: new Date(),
            updatedAt: new Date(),
            noOfUsers:1
        },
        {
            id:2, 
            companyId:1, 
            authorId:1, 
            authorName:'Shoaib Mustafa', 
            title:'Mechanical', 
            suffix:'TK',
            createdAt: new Date(),
            updatedAt: new Date(),
            noOfUsers:7
        },
        {
            id:3, 
            companyId:1, 
            authorId:1, 
            authorName:'Shoaib Mustafa', 
            title:'Electrical', 
            suffix:'ELE',
            createdAt: new Date(),
            updatedAt: new Date(),
            noOfUsers:5
        },
        {
            id:4, 
            companyId:1, 
            authorId:1, 
            authorName:'Shoaib Mustafa', 
            title:'Process', 
            suffix:'PRO',
            createdAt: new Date(),
            updatedAt: new Date(),
            noOfUsers:3
        },
        {
            id:5, 
            companyId:1, 
            authorId:1, 
            authorName:'Shoaib Mustafa', 
            title:'Piping', 
            suffix:'PIP',
            createdAt: new Date(),
            updatedAt: new Date(),
            noOfUsers:12
        },
        {
            id:6, 
            companyId:1, 
            authorId:1, 
            authorName:'Shoaib Mustafa', 
            title:'Civil / Structure', 
            suffix:'CIV',
            createdAt: new Date(),
            updatedAt: new Date(),
            noOfUsers:7
        },
        {
            id:7, 
            companyId:1, 
            authorId:1, 
            authorName:'Shoaib Mustafa', 
            title:'Instrumentation', 
            suffix:'INS',
            createdAt: new Date(),
            updatedAt: new Date(),
            noOfUsers:1
        },
      ],
      { ignoreDuplicates: true }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("departments", null, {});
  },
};
