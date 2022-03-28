(**WIP**)
! Please do not alter this file unless you have expressed consent from the creators !

## Testing your Components

This is to be a standard for endpoint codes coming from the BACKEND

## Status Codes:
[documentation](https://github.com/mdn/content/blob/main/files/en-us/web/http/status/index.md?plain=1)

#### Successful Responses
| Code | Constant                        | Reason Phrase                   |
| 200 | Responding Properly | Used for Sucess messages that don't do anything else but respond successfully |
| 201 | Created | Used for [POST] to denote that something was created |

#### Failing Responses
| Code | Constant                        | Reason Phrase                   |
| 400 | Bad Request | something has gone wrong on the database |
| 401 | Unauthorized | User does not have an Authorization to enter the server |
| 403 | Forbidden | User has Authorization, but not the correct Auth for this endpoint use |
