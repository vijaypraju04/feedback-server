function localtunnel {
  lt -s shaggy-parrot-17 --port 5000
}
until localtunnel; do
echo "localtunnel server crashed"
sleep 2
done
