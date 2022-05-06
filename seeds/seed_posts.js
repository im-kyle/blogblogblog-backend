/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.seed = async function(knex) {
  await knex('posts').del()
  await knex('posts').insert([
    {title: 'First Post', content: 'This blog is my best project yet!', created_by: 'Kyle'},
    {title: 'Huh?!', content: 'Posts seeded by Knex!', created_by: 'Kyle'},
    {title: 'Registering an Account', content: 'If you register, you can make, edit, and delete posts. However, your posts will disappear when the server restarts.', created_by: 'Kyle'},
    {title: 'Project', content: 'Full Stack Full Crud', created_by: 'Kyle'},
    {title: 'Go Kyle', content: 'I knew you could do it!', created_by: 'Caitlin'}
  ]);
};