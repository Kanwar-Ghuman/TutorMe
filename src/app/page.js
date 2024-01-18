import Image from 'next/image'

export default function Home() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6">
            <h1 className="display-1">TutorMe</h1>
            <p className="lead">TutorMe is a platform for students to connect with tutors.</p>
          </div>
          <div className="col-12 col-md-6">
            <Image src="/images/tutoring.png" alt="Tutoring" width={500} height={500} />
          </div>
        </div>
      </div>
    </>
  )
}
