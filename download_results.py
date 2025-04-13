"""
Simple script to download results and use them as a cache.
"""
import argparse
import json
import logging
import os
import requests
import time

EVENT_IDS = list(range(40007, 40014+1))
CHARACTER_IDS = list(range(1, 28+1))  # TODO old events don't have 28 chars
KEY_RANKS = list(range(1, 11)) + [10, 100, 1000, 3000]
uri_format = "https://api.matsurihi.me/sc/v1/events/fanRanking/{eventId}/rankings/logs/{characterId}/{ranks}"


def fetch_and_save(event_id: int, character_id: int, rank: int):
  uri = uri_format.format(
    eventId=event_id,
    characterId=character_id,
    ranks=rank
  )
  logging.info(uri)

  output_path = f"./results/{event_id}/{character_id}/{rank}.json"
  os.makedirs(os.path.dirname(output_path), exist_ok=True)
  try:
    data = requests.get(uri).text
    data_json_format = json.loads(data)
    with open(output_path, 'w', encoding='utf-8') as f:
      json.dump(data_json_format, f, indent=4)

  except Exception as e:
    logging.error(f"error {e} on get {uri}")


def main(args):
  event_id = args.eventID
  for character_id in CHARACTER_IDS:
    for rank in KEY_RANKS:
      fetch_and_save(event_id, character_id, rank)
      time.sleep(1)


def parse_args():
  parser = argparse.ArgumentParser()
  parser.add_argument('--event_id', type=int, required=True)

  args = parser.parse_args()
  return args

if __name__ == '__main__':
  logging.basicConfig(level=logging.INFO)
  args = parse_args()
  main(args)