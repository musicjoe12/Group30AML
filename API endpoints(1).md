<!--This is a simple setup often used for RESTful APIs in documentation or code comments, especially in OpenAPI or Swagger-style formats.
You should include as markdown file in your github repository and include the link to the folder in the report.-->

# API Endpoint Template

**Endpoint**:
[HTTP Method] /api/[resource]  
**Description**: [Brief description of what the endpoint does]  
**Headers**:

- `Authorization`: Bearer [token] (required if the endpoint is protected)

- `Content-Type`: application/json

**Query Parameters** (for `GET` requests only):

- `param_name` (type: string, required/optional): Description of the query parameter.

**Request Body** (for `POST`, `PUT`, `PATCH` requests):

```json
{
  "field_name": "value" 
}
```

## Example API Endpoint

This example shows a `POST` endpoint for creating a new user in a system.  
**Endpoint**: POST /api/users  
**Description**: Creates a new user in the system.

**Headers**:

- `Authorization`: Bearer [token] (required)
- `Content-Type`: application/json

**Request Body**:

```json
{
  "username": "exampleUser", 
  "email": "user@example.com", 
  "password": "securePassword123" 
}
```

***Response***:

- Status: 201 Created
- Body:

```json
{
  "id": "12345", 
  "created_at": "2024-11-04T14:00:00z" 
}
```
