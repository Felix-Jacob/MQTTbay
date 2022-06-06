curl -X POST -H "Content-Type: application/json" \
    -d '{"name": "linuxize", "email": "linuxize@example.com"}' \
    localhost:4000/login

curl -X POST -H "Content-Type: application/json" \
    -d '{"username": "emilia", "email": "linuxize@example.com"}' \
    localhost:4000/login

curl -X POST -H "Content-Type: application/json" \
    -d '{"username": "emilia", "password": "5234"}' \
    localhost:4000/login

curl -X POST -H "Content-Type: application/json" \
    -d '{"username": "emilia", "password": "1234"}' \
    localhost:4000/login
