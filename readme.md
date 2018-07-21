# Chandigarh Events

Web app to show events in Chandigarh and add new events.

Built using Python/flask for back-end and React for front-end.

## Getting Started

### Prerequisites

To run this app, you need following pre-installed.

- Python 3.x and pip
    - Pre-installed on most Linux and mac
    - Download from [Python website](https://www.python.org/getit/) for windows

- Nodejs and npm
    - Install using [nvm](https://github.com/creationix/nvm)

### Installing

- Clone repository

```
git clone https://github.com/ManinderGharuan/chandigarh-events.git
```

- Move to the project directory and install requirements

```
cd chandigarh-events
pip install -r requirements.txt
```

- Run python server

```
python run.py web
```

- Open another terminal
- Now move to the UI directory and run react app

```
cd web/ui
npm start
```

Application will be open in browser

### Screenshot

Home Page
![Home](/screenshots/home.png?row=true "Home Page")

Event Form
![Add Event](/screenshots/add-event.png?row=true "Add Event Form")

Open Event
![Event Click](/screenshots/event-click.png?row=true)

## Built With

* [React](https://reactjs.org/docs/getting-started.html) - JavaScript library is used for building user interface
* [Flask](http://flask.pocoo.org/docs/1.0/) - Micro-framework is used for back-end
