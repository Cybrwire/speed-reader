# Speed Reader

A Japanese speed-reading web app. Paste in Japanese text, and the app breaks it into words using [ichiran](https://github.com/tshatrov/ichiran). Then you practice speed-reading as it shows you one word at a time. 


https://github.com/user-attachments/assets/9418ecf8-9ab0-46ce-b811-0702b752be9d

## Story

I've been studying Japanese for many years and I love reading books in Japanese but one of the biggest hurdles to reading in Japanese is reading speed. So I built this tool to train my recognition speed, and in turn, increasing my reading speed. I have many friends who enjoy reading in Japanese as well, so my goal for this project is to have several modes for fun speed reading activities based on real life scenarios, such as reading road signs, horizontal / vertical text, menu options, and many more. 


## Features

### Paragraph mode
The text is formatted like a normal paragraph.


https://github.com/user-attachments/assets/f418315a-ddba-4c17-a784-7678e94d630f


### Focused mode
Words appear in a fixed spot, so your eyes don't move.


https://github.com/user-attachments/assets/74ce8610-6785-41fe-8dcd-be7f93e4a4be


## Roadmap

- [ ] Better grouping for symbols and punctuation
- [ ] Furigana for kanji 
- [ ] More game modes (road signs, timed races, and more)
- [ ] JWT auth middleware to protect routes
- [ ] Deploy with a managed Postgres provider
- [ ] Docker Compose setup for the full app

## Project layout

```
React client  -->  Express API  -->  ichiran-cli (Docker)
                       |
                       v
                  PostgreSQL (users)
```

1. The **React client** sends Japanese text to the API.
2. The **Express API** (TypeScript) validates the input and calls the ichiran wrapper.
3. The **wrapper** (`server/src/ichiran.ts`) runs `ichiran-cli` inside a Docker container, then parses its JSON output into a flat list of words.
4. The API returns the words to the client as JSON.
5. User accounts are stored in a separate **PostgreSQL 16** database.

There are two independent Postgres instances: one holds user data, and the other (inside the ichiran Docker stack) holds the JMdict dictionary data.


## How to run (locally)

**Requirements:** Node.js 24, Docker Desktop, Git

```bash
# 1. Clone with the ichiran submodule
git clone --recurse-submodules https://github.com/Cybrwire/speed-reader.git
cd speed-reader

# 2. Create server .env (see the variables below)

# 3. Start backend (keep this terminal running)
./start-dev.sh

# 4. Start frontend (in a new terminal)
cd frontend
npm run dev
```

**First run:** ichiran imports a ~4.7GB dictionary database. This takes several minutes. It is finished when the logs print `All set, awaiting commands.`

**Environment variables** (`server/.env`):
###### Only used if you wish to make a profile. Currently not yet implemented (2026/11/19)
| Variable | Purpose |
|---|---|
| `SECRET` | Secret key used to sign login tokens. Use a long random string. |
| `DB_HOST` | Address of the user-data Postgres server (`localhost` when running locally) |
| `DB_PORT` | Port Postgres listens on |
| `DB_USER` | Postgres username the API logs in with |
| `DB_PASSWORD` | Password for that Postgres user |
| `DB_NAME` | Name of the database that stores user accounts |

```env
SECRET=replace-with-a-long-random-string
DB_HOST=localhost
DB_PORT=5432
DB_USER=choose-a-username
DB_PASSWORD=choose-a-password
DB_NAME=speedreader_database_name
```

## Tech stack

- **Frontend:** React
- **Backend:** Node.js, TypeScript, Express
- **Database:** PostgreSQL 16 (Docker)
- **Parsing:** ichiran (Docker, added as a git submodule)
- **Auth:** bcrypt, JSON Web Tokens
- **Dev tools:** tsx, nodemon, Docker Compose

## Technical decisions

- **`execFile` instead of `exec`.** User text is passed to a command-line tool. `execFile` does not run a shell, so text like `; rm -rf /` cannot be treated as a command.
- **Handling ichiran's inconsistent output.** For conjugated or ambiguous words, ichiran returns `{ alternative: [...] }` instead of a plain word object. I handle this with a TypeScript union type and a type guard, so the compiler forces me to cover both cases.
- **Separate databases.** User data and dictionary data live in different Postgres instances, so I can move user data to a managed provider later without touching ichiran.


## Credits

Japanese parsing is done by [ichiran](https://github.com/tshatrov/ichiran) by tshatrov.
