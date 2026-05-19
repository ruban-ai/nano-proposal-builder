# Nano Proposal Builder

A lightweight browser-first proposal builder for sales teams, consultants, and internal revenue operations. This repo contains a single focused web app: `proposal-builder.html`, with a minimal root entry page that redirects to the proposal builder.

## Features

- Clean single-page proposal builder UI
- Customer and deal inputs
- Live pricing summary
- Printable proposal layout
- PDF export-ready
- No unrelated LMS, course, or navigation modules

## Files

- `index.html` — root entry page that redirects to `proposal-builder.html`
- `proposal-builder.html` — proposal builder app

## Usage

1. Open `index.html` in a browser
2. The page will redirect to the proposal builder automatically
3. Enter customer details, line items, and pricing
4. Use the print or PDF options to export the proposal

## Local preview

If you want to run it locally with a simple HTTP server:

```bash
cd "path/to/repo"
python -m http.server 8000
