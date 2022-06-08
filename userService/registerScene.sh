curl -X POST -H "Content-Type: application/json" \
	-d '{"username": "uello", "password": "world"}' \
	localhost:4000/register

curl -X POST -H "Content-Type: application/json" \
	-d '{"username": "hello", "password": "world"}' \
	localhost:4000/register
