# ProjektCourt
## Opis
Aplikacja do zarządzania kortami.

## Funkcjonalności
### Must-have
- Dodawanie kortów ( Tylko admin )
- Wyświetlanie kortów, wraz z sortowaniem ( Wszyscy użytkownicy, także nie zalogowani)
- Logowanie ( Wszyscy użytkownicy, także nie zalogowani)

### Other
- ocena kortów ( zalogowani użytkownicy )
- zarządzenie kortami ( Tylko admin )
- opinie o kortach ( Wszyscy użytkownicy, także niezalogowani)
- Opinie użytkownika

| **Must-have**                                         | **Typ**   | **Endpoint**                    |
|-------------------------------------------------------|-----------|---------------------------------|
| Dodawanie kortów                                      | POST      | /api/court/add                  |
| Edycja kortów                                         | PUT       | /api/court/{courtId}/edit       |
| Usuwanie kortów                                       | DELETE    | /api/court/{courtId}/delete     |
| Wyświetlanie kortów, wraz z sortowaniem               | GET       | /api/court/getAll               |
| Logowanie (Tylko osoba zalogowana może dodawać korty) |           | OAuth2 lub zwykły login i hasło |


| **Other**                                 | **Typ**   | **Endpoint**                         |
|-------------------------------------------|-----------|--------------------------------------|
| Wyświetlanie kortu, wraz z sortowaniem    | GET       | /api/court/{courtId}                 |
| Wyświetlanie ocen o kortach               | GET       | /api/grade/getAll                    |
| Dodawanie ocen do kortów                  | POST      | /api/grade/{userId}/court/{courtId}  |
| Edycja ocen kortów                        | PUT       | /api/grade/{userId}/court/{courtId}  |
| Wyświetlanie typów podłoża kortu          | GET       | /api/surfaceType                     |
| Dodawanie nowych typów podłoża kortu      | POST      | /api/surfaceType/addNewSurfaceType   |
| Rejestracja użytkowników                  | POST      | /api/user/register                   |
| Zmiana roli użytkowników                  | PUT       | /api/user/{userId}/role              |


## Typ danych

Role:

Enum:
- 0 - USER
- 1 - ADMIN

User:

| **Id (number)**      | **name (string)** | **email (string)** | **password (string)** | **role (number)** | **averageGrade (float)** |
|----------------------|-------------------|--------------------|-----------------------|-------------------|--------------------------|
| 1                    | Wiktor            | example@gmail.com  | 123427!Ac             | 1                 | Wiktor                   |

Kort:

| **Id (number)**     | **name (string)** | **localization (string)** | **surfaceType (string)** |
|---------------------|-------------------|---------------------------|--------------------------|
| 1                   | Kort 1            | Rzeszów                   | Mączka                   |


Typ Nawierzchni Kortów:

| **Id (number)**    | **Nazwa (String)** |
|--------------------|--------------------|
| 1                  | Mączka             |

Komentarze:

| **Id (number)**      | **content (string)** | **UserId (number)** | **CourtId (number)** |
|----------------------|----------------------|---------------------|----------------------|
| 1                    | Kort jest świetny    | 1                   | 1                    |

Ocena:

| **Id (number)**     | **UserId (number)** | **grade (number)** | **CourtId (number)**  |
|---------------------|---------------------|--------------------|-----------------------|
| 1                   | 1                   | 1 <1,5>            | 1                     |

## Technologie
### Frontend
- React
- NextJs
- Typescriptt
- Tailwindcss
- Docker

### Backend
- .Net
- PostgresSQL
- Docker

## Details of project progress are in [project releases](https://github.com/ZegarekPL/ProjektCourt-frontend/releases)

## How to run:

### Frontend in native:

Install packages

```bash
npm ci
```

Run project

```bash
npm run dev
```

### Frontend in docker:

To run app in docker:

```bash
docker-compose up -d --build
```

To close it:

```bash
docker-compose down
```

### To Clear Unused Docker Resources

To clean up unused Docker resources and free up disk space:

```bash
docker system prune -a
```

To clean up unused Docker Images and free up disk space:

```bash
docker image prune -a
```

To clean up unused Docker Volumes and free up disk space:

```bash
docker volume prune -a
```