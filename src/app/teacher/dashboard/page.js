import React from 'react';
import TutorCard from '@/components/tutorme/home/teacher/teacherRequest';

const Dashboard = () => {
  const tutors = [
    { name: 'John Doe', email: 'john@example.com', tutorName: 'Mr. Smith', subject: 'IM' },
    { name: 'Jane Smith', email: 'jane@example.com', tutorName: 'Ms. Johnson', subject: 'Precalc' },
    { name: 'Alice Johnson', email: 'alice@example.com', tutorName: 'Dr. Brown', subject: 'Calc' },
    { name: 'Bob Brown', email: 'bob@example.com', tutorName: 'Prof. White', subject: 'Physics' },
    { name: 'Carol White', email: 'carol@example.com', tutorName: 'Mr. Green', subject: 'Biology' },
    { name: 'David Green', email: 'david@example.com', tutorName: 'Ms. Black', subject: 'Chemistry' },
    { name: 'Eve Black', email: 'eve@example.com', tutorName: 'Dr. Blue', subject: 'Language' },
    { name: 'Frank Blue', email: 'frank@example.com', tutorName: 'Prof. Yellow', subject: 'Other' },
    { name: 'Grace Yellow', email: 'grace@example.com', tutorName: 'Mr. Purple', subject: 'IM' },
    { name: 'Hank Purple', email: 'hank@example.com', tutorName: 'Ms. Orange', subject: 'Precalc' },
  ];
    // Add more tutor objects as needed

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 mt-16">
        {tutors.map((tutor, index) => (
          <TutorCard
            key={index}
            name={tutor.name}
            email={tutor.email}
            tutorName={tutor.tutorName}
            subject={tutor.subject}
          />
        ))}
      </div>
    );
};

export default Dashboard;