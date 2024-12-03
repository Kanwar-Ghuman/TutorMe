export async function sendConfirmationEmails({
  studentEmail,
  tutorEmail,
  requestId,
}) {
  const studentToken = generateToken();
  const tutorToken = generateToken();

  await prisma.tutorRequest.update({
    where: { id: requestId },
    data: {
      studentToken,
      tutorToken,
    },
  });

  await Promise.all([
    sendEmail({
      to: studentEmail,
      subject: "Confirm Your Tutor Match",
      html: `Click to confirm: ${process.env.NEXT_PUBLIC_URL}/confirm/${studentToken}?type=student`,
    }),
    sendEmail({
      to: tutorEmail,
      subject: "Confirm Your Student Match",
      html: `Click to confirm: ${process.env.NEXT_PUBLIC_URL}/confirm/${tutorToken}?type=tutor`,
    }),
  ]);
}
