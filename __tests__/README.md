! Please do not alter this file unless you have expressed consent from the Product Release Managers !

# Summary
This is to be a standard for Response Codes from backend endpoints. Response codes range from
 - Sucess ( 200 - 299 )
 - Redirect ( 300 - 399 )
 - Client Errors ( 400 - 499 )
 - Server Errors ( 500 - 599 )
**400 & 500 Errors are General/Unknown Errors -- all others have known causes**

## Status Codes:
Please see [documentation](https://github.com/mdn/content/blob/main/files/en-us/web/http/status/index.md?plain=1) if you have questions about implementation

### Successful Responses: (200 - 299)
| Code | Constant                        | Reason Phrase                   |
|------|-----------------------------|--------------------------------------------------|
| 200 | Responding Properly | Used for Sucess messages that don't do anything else but respond successfully |
| 201 | Created | Used for [POST] to denote that something was created |
| 299 | Deprecated API | Propsed status code for deprecated API use ONLY |


### Failed Responses: (400 - 499)
| Code | Constant                        | Reason Phrase                   |
|------|-----------------------------|--------------------------------------------------|
| 400 | Bad Request | Something has gone wrong on the database. |
| 401 | Unauthorized | User does not have an Authorization Token to enter the server |
| 403 | Forbidden | User has a means of Auth (token), but not the correct Auth for this endpoint use |
| 404 | Not Found | The server cannot find the requested resource (i.e the endpoint is not valid). Use this instead of a 403 if we want to disguise the fact that the endpoint does exist, but the user does not have access. |
| 406 | Unacceptable User Input | User is attempting to [POST] something and it fails. |
| 407 | Third Party Error | Can use this to show that there is something happening with a Third Party service |
| 408 | Timeout | Server times out after 'x' amount of time. |
| 418 | Teapot Fun | Easter eggs for developers to learn about |

### Server Issues: (500 - 599)
| Code | Constant                        | Reason Phrase                   |
|------|-----------------------------|--------------------------------------------------|
| 500 | Internal Server Error | The server has encountered a situation it does not know how to handle. |
| 503 | Service Unavailable | The server is down for maintenance or is overloaded. Please try again later. |


###### (Probably no need for the below, but could be fun to encorporate somehow...)
### Redirect Responses: (300 - 399)
| Code | Constant                        | Reason Phrase                   |
|------|---------------------------------|--------------------------------------------------|
| 302 | Found | The endpoint that is being requested does exist. This is usually followed up with one of the redirects below. |
| 307 | Temporary Redirect | The endpoint that is being requested is underconstruction. Normally preceeded by a 302. |
| 308 | Permanent Redirect | The endpoint that is requested here is located in another URI -- used to be here, but not anymore. Please dont change the [POST] endpoint, but your [GET] is incorrect and needs changing. |


###### Use Cases:
| Code | Cases |
|--------|-----------------------------|
| 200 | General Successful response code. |
| 201 | Successful response code for newly created request |
| 299 | Successful, Deprecated Resource |
| 302 | No use cases for this so far |
| 307 | No use cases for this so far |
| 308 | No use cases for this so far |
| 400 | General Error response code to Client -- something wrong in the frontend, not backend |
| 401 | Not an authenticated user |
| 403 | You are an authenticated user, but do not have permissions to endpoint. |
| 404 | Endpoint doesn't exist. Requested resource is not at this URI. Not found here. |
| 407 | Error from Third Party service -- (OKTA or 0Auth) |
| 408 | Server takes too long to respond to a client's request. |
| 418 | Easter Eggs for FUN! |
| 500 | Unknown Internal Server Error |
| 503 | Only if the site is being worked on. |
