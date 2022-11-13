import bcrypt from 'bcryptjs';
const data = {
  Study_Fields: [
    { field: 'School' },
    { field: 'Jr. Collage' },
    { field: 'Graduation' },
    { field: 'State Public Service Commision (MPSC)' },
    { field: 'Union Public Service Commision (UPSC)' },
  ],
  registered_users: [
    {
      firstName: 'tushar',
      lastName: 'tushar',
      email: 'admin@example.com',
      mobNo: 9999999999,
      study_field: 'School',
      password: bcrypt.hashSync('12345'),
      isAdmin: true,
    },
  ],
};
export default data;
