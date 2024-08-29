import React from 'react';
import TutorCard from '@/components/tutorme/home/teacher/teacherRequest';

const Dashboard = () => {
  const tutors = [
    { name: "John Doe", email: "john@example.com", subject: "IM" },
    { name: "Jane Smith", email: "jane@example.com", subject: "Precalc" },
    { name: "Alice Johnson", email: "alice@example.com", subject: "Calc" },
    { name: "Bob Brown", email: "bob@example.com", subject: "Physics" },
    { name: "Carol White", email: "carol@example.com", subject: "Biology" },
    { name: "David Green", email: "david@example.com", subject: "Chemistry" },
    { name: "Eve Black", email: "eve@example.com", subject: "Language" },
    { name: "Grace Yellow", email: "grace@example.com", subject: "IM" },
    { name: "Hank Purple", email: "hank@example.com", subject: "Precalc" },
  ];
    // Add more tutor objects as needed

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 mt-16">
        {tutors.map((tutor, index) => (
          <TutorCard
            key={index}
            name={tutor.name}
            email={tutor.email}
            subject={tutor.subject}
          />
        ))}
      </div>
    );
};

export default Dashboard;