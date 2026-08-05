import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit


SITE_ROOT = Path(__file__).resolve().parent


class CleanURLHandler(SimpleHTTPRequestHandler):
    def send_head(self):
        path = unquote(urlsplit(self.path).path)
        requested_path = path.lstrip("/")

        if path != "/" and requested_path and not Path(requested_path).suffix:
            html_file = (SITE_ROOT / f"{requested_path}.html").resolve()

            if html_file.is_relative_to(SITE_ROOT) and html_file.is_file():
                self.path = f"/{requested_path}.html"

        return super().send_head()


def main():
    parser = argparse.ArgumentParser(description="Serve the site with clean URLs.")
    parser.add_argument("--bind", default="localhost", help="Address to bind to")
    parser.add_argument("--port", type=int, default=4173, help="Port to listen on")
    args = parser.parse_args()

    handler = partial(CleanURLHandler, directory=SITE_ROOT)
    server = ThreadingHTTPServer((args.bind, args.port), handler)
    print(f"Serving Vale of Allen at http://{args.bind}:{args.port}")

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()