"""
Simple script to download results and use them as a cache.
"""
import argparse
import enum
import json
import logging
import os
import requests
import time

class DataSource(enum.Enum):
  MATSURIHIME = 0
  CHIYOKO = 1


EVENT_IDS = list(range(40007, 40014+1))
CHARACTER_IDS = list(range(1, 28+1))  # TODO old events don't have 28 chars
# KEY_RANKS = list(range(1, 11)) + [10, 100, 1000, 3000]
KEY_RANKS = [1, 10, 100, 1000, 3000]
uri_formats = {
  DataSource.MATSURIHIME.name: "https://api.matsurihi.me/sc/v1/events/fanRanking/{eventId}/rankings/logs/{characterId}/{ranks}",
  DataSource.CHIYOKO.name: "https://api.chiyoko.cc/sc/v1/events/fanRanking/{eventId}/rankings/logs/{characterId}/{ranks}",
}


def fetch_and_save(data_source: str, event_id: int, character_id: int, ranks: str):
  uri = uri_formats[data_source].format(
    eventId=event_id,
    characterId=character_id,
    ranks=ranks
  )
  logging.info(uri)

  output_path = f"./results/{event_id}/{character_id}/{ranks}.json"
  os.makedirs(os.path.dirname(output_path), exist_ok=True)
  try:
    data = requests.get(uri).text
    data_json_format = json.loads(data)
    with open(output_path, 'w', encoding='utf-8') as f:
      json.dump(data_json_format, f, indent=4)

  except Exception as e:
    logging.error(f"error {e} on get {uri}")


def merge_results_per_event(event_id: int):
  ranks = ",".join(map(str, KEY_RANKS))
  results_event = {}
  for character_id in CHARACTER_IDS:
    output_path = f"./results/{event_id}/{character_id}/{ranks}.json"
    if os.path.exists(output_path):
      with open(output_path, 'r', encoding='utf-8') as f:
        results_event[character_id] = json.load(f)
    else:
      results_event[character_id] = {}

  output_path = f"./results/{event_id}/rank.json"
  with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(results_event, f, indent=4)


def merge_results():
  ranks = ",".join(map(str, KEY_RANKS))
  results_all = {}
  for event_id in EVENT_IDS:
    results_all[event_id] = {}
    for character_id in CHARACTER_IDS:
      output_path = f"./results/{event_id}/{character_id}/{ranks}.json"
      if os.path.exists(output_path):
        with open(output_path, 'r', encoding='utf-8') as f:
          results_all[event_id][character_id] = json.load(f)
      else:
        results_all[event_id][character_id] = {}

  output_path = f"./results/rank.json"
  with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(results_all, f, indent=4)


def main(args):
  event_id = args.event_id
  for character_id in CHARACTER_IDS:
    ranks = ",".join(map(str, KEY_RANKS))
    fetch_and_save(args.data_source, event_id, character_id, ranks)
    time.sleep(1)


def parse_args():
  parser = argparse.ArgumentParser()
  parser.add_argument('--event_id', type=int, required=True)
  parser.add_argument('--data_source', type=str, default=DataSource.MATSURIHIME.name)

  args = parser.parse_args()
  return args

if __name__ == '__main__':
  logging.basicConfig(level=logging.INFO)
  args = parse_args()
  main(args)