#!/usr/bin/env python3
import argparse
import json


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--name", default="world")
    args = parser.parse_args()
    print(json.dumps({"message": f"hello, {args.name} from python"}))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
