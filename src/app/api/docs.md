# Tutoring Application API Documentation

## Teacher Role (Authentication Required)

### Create Tutoring Request
- **POST /api/teacher/tutor-request**
  - **Description:** Create a new tutoring request on behalf of a student.
  - **Body:**
    ```json
    {
      "studentId": "string",
      "subject": "string",
      "preferredGender": "string"
    }
    ```

### View Past Tutoring Requests
- **GET /api/teacher/past-tutor-requests**
  - **Description:** Retrieve past tutoring requests made by the teacher.

### Delete Tutoring Request
- **DELETE /api/teacher/tutor-request/{requestId}**
  - **Description:** Delete a specific tutoring request.
  - **Path Parameter:** `requestId`: string

### Modify Tutoring Request
- **PUT /api/teacher/tutor-request/{requestId}**
  - **Description:** Modify an existing tutoring request.
  - **Path Parameter:** `requestId`: string
  - **Body:**
    ```json
    {
      "studentId": "string",
      "subject": "string",
      "preferredGender": "string"
    }
    ```

### Update Tutoring Request Status
- **POST /api/teacher/request-status**
  - **Description:** Update the status of a tutoring request.
  - **Body:**
    ```json
    {
      "requestId": "string",
      "status": "string" // e.g., "pending", "confirmed", "completed"
    }
    ```

## Student Role (Token-based Authentication)

### Confirm Tutoring Session (Tutor)
- **POST /api/student/tutor-confirm**
  - **Description:** Allow a tutor to confirm a tutoring session.
  - **Body:**
    ```json
    {
      "sessionId": "string",
      "confirm": "boolean"
    }
    ```

### Confirm Tutoring Session (Student)
- **POST /api/student/student-confirm**
  - **Description:** Allow the student being tutored to confirm a tutoring session.
  - **Body:**
    ```json
    {
      "sessionId": "string",
      "confirm": "boolean"
    }
    ```

### View Tutoring Session Details
- **GET /api/student/tutoring-session/{sessionId}**
  - **Description:** View details of a specific tutoring session.
  - **Path Parameter:** `sessionId`: string

## Admin Role (Authentication Required)

### View All Past Tutor Requests
- **GET /api/admin/past-tutor-requests**
  - **Description:** View all past tutoring requests across all teachers.

### Confirm or Override Tutor Match
- **POST /api/admin/confirm-tutor-request**
  - **Description:** Confirm or override the automatically matched tutor.
  - **Body:**
    ```json
    {
      "requestId": "string",
      "override": "boolean",
      "assignedTutorId": "string" // Optional, required if override is true
    }
    ```

### Manually Assign a Tutor
- **POST /api/admin/manual-assign-tutor**
  - **Description:** Manually assign a tutor to a student's request.
  - **Body:**
    ```json
    {
      "requestId": "string",
      "tutorId": "string"
    }
    ```

### Add a Tutor
- **POST /api/admin/tutor**
  - **Description:** Add a new tutor to the system.
  - **Body:**
    ```json
    {
      "tutorId": "string",
      "name": "string",
      "subjects": ["string"],
      "availability": "string"
    }
    ```

### Modify Tutor Details
- **PUT /api/admin/tutor/{tutorId}**
  - **Description:** Modify details of an existing tutor.
  - **Path Parameter:** `tutorId`: string
  - **Body:**
    ```json
    {
      "name": "string",
      "subjects": ["string"],
      "availability": "string"
    }
    ```

### Delete a Tutor
- **DELETE /api/admin/tutor/{tutorId}**
  - **Description:** Remove a tutor from the system.
  - **Path Parameter:** `tutorId`: string
