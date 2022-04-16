# System Wypożyczeń i Rezerwacji API

Usługa stworzona w ramach pracy dyplomowej pt. "Opracowanie serwisu do rezerwacji i wypożyczeń sprzętu w Katedrze Systemów Multimedialnych".

## Założenia projektowe

Opracowanie serwisu ma na celu poprawę i usystematyzowanie procesu wypożyczania i rezerwacji sprzętu, w którego posiadaniu jest KSM. Po stronie zwykłego użytkownika system zapewnia `TODO`. Po stronie administratora (pracownika Katedry) system pozwala na `TODO`.

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
