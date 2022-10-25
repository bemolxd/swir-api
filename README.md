# System Wypożyczeń i Rezerwacji API

Usługa stworzona w ramach pracy dyplomowej pt. "Opracowanie serwisu do rezerwacji i wypożyczeń sprzętu w Katedrze Systemów Multimedialnych".

## Dokumentacja

Dokumentacja API znajduje się [pod tym linkiem](https://multimed.org/swir/api).

## Funkcjonalność

Opracowanie serwisu ma na celu poprawę i usystematyzowanie procesu wypożyczania i rezerwacji sprzętu, w którego posiadaniu jest KSM. Po stronie zwykłego użytkownika system zapewnia:

- wgląd do bazy urządzeń KSM,
- możliwość sprawdzenia dostępności sprzętu,
- możliwość stworzenia (poprzez dodanie urządzenia) zgłoszenia i przesłania go do pracownika KSM,
- wgląd do wszystkich swoich aktywnych i/lub kompletowanych zgłoszeń,
- wgląd do wszystkich swoich archiwalnych zgłoszeń.

Po stronie administratora (pracownika Katedry) system pozwala na:

- wgląd do bazy urządzeń KSM i modyfikowanie zawartości (dodawanie, edytowanie, usuwanie),
- możliwość sprawdzenia dostępności sprzętu,
- możliwość zarządania zgłoszeniami (odrzucanie, akceptacja -> finalizacja),
- wgląd do wszystkich przesłanych zgłoszeń,
- wgląd do wszystkich zarchiwizowanych zgłoszeń,
- wgląd do wszystkich użytkowników systemu i zarządzanie ich uprawnieniami,
- wgląd do wszystkich zgłoszeń danego użytkownika (widok szczegółu użytkownika).

## Auth

Żeby korzystać z usługi, należy być zarejestrowanym w CAS PG. Usługa obsługuje autentykację poprzez protokół OAuth 2.0 na udostępnionych przez CUI PG endpointach. Zapewnia to zabezpieczenie przed dostępem dla osób niezwiązanych z PG.

## Installacja

```bash
$ yarn install
```

## Uruchamianie aplikacji

W celu poprawnego uruchomienia aplikacji w środowisku testowym należy upewnić się, że usługa CAS PG jest dostępna oraz ustawić odpowiednie parametry w pliku `.env` (na podstawie zamieszczonego w repo pliku `.env.example`), a następnie:

```bash
$ yarn dev
```
