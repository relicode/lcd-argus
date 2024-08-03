#!/usr/bin/env python3

import os, socket, sys

def configure_lcd():
    from RPLCD.i2c import CharLCD
    lcd = CharLCD(i2c_expander='PCF8574', address=0x27, port=1, cols=20, rows=4, dotsize=8)
    return lcd

def format_for_screen(string_or_list) -> list[str]:
    lines = string_or_list.splitlines() if isinstance(string_or_list, str) else string_or_list
    trimmed_lines: list[str] = []
    for line in lines[:4]:
        try:
            trimmed_lines.append(line[:20])
        except IndexError:
            break
    return '\n\r'.join(trimmed_lines)

def print_to_lcd(formatted: str):
    lcd = configure_lcd()
    lcd.clear()
    lcd.write_string(formatted)

lines = format_for_screen(sys.argv[1:])

if socket.gethostname() in [
    'argus',
    os.environ.get('LCD_HOSTNAME'),
]: print_to_lcd(lines)

print(lines)
