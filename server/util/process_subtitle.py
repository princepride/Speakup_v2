import re
from datetime import timedelta

def str_to_timedelta(s):
    hours, minutes, rest = map(int, re.split('[:]', s.split(',')[0]))
    seconds, milliseconds = map(int, re.split('[,]', s.split(':')[2]))
    return timedelta(hours=hours, minutes=minutes, seconds=seconds, milliseconds=milliseconds)

def timedelta_to_str(td):
    hours, remainder = divmod(td.seconds, 3600)
    minutes, seconds = divmod(remainder, 60)
    return "{:02}:{:02}:{:02},{:03}".format(int(hours), int(minutes), int(seconds), td.microseconds//1000)

def merge_subs(srt_file):
    merged_subs = []
    start_time = None
    end_time = None
    text = []
    need_merged = False
    last_text = ""

    with open(srt_file, 'r', encoding='utf-8', errors='replace') as file:
        for line in file:
            line.replace('\ufffd', ' ')
            if line.strip().isdigit():
                continue
            elif '-->' in line:
                times = line.split('-->')
                if start_time is None:
                    start_time = str_to_timedelta(times[0].strip())
                end_time = str_to_timedelta(times[1].strip())

                if end_time - start_time >= timedelta(seconds=10):
                    need_merged = True
            else:
                if line.strip()!= "" and line.strip() != last_text:  # Only add line if it's not the same as the last one
                    text.append(line.strip())
                    last_text = line.strip()
                if line.strip() == "" and need_merged:
                    merged_subs.append((start_time, end_time, ' '.join(text)))
                    start_time = None
                    text = []
                    need_merged = False

        if start_time is not None:
            merged_subs.append((start_time, end_time, ' '.join(text)))

    return merged_subs

def write_merged_subs(merged_subs, output_file):
    with open(output_file, 'w', encoding='utf-8', errors='replace') as file:
        for i, (start, end, text) in enumerate(merged_subs, 1):
            file.write(str(i) + '\n')
            file.write(timedelta_to_str(start) + ' --> ' + timedelta_to_str(end) + '\n')
            file.write(text + '\n\n')


def process_subtitle(srt_file, output_file):
    merged_subs = merge_subs(srt_file)
    write_merged_subs(merged_subs, output_file)


def main():
    srt_file = 'input.srt'
    output_file = 'output.srt'
    merged_subs = merge_subs(srt_file)
    write_merged_subs(merged_subs, output_file)

if __name__ == "__main__":
    main()