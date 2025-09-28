# SfidaMi.site - Sistema di Gestione Collaboratori

Un'applicazione web per la gestione dei collaboratori nel progetto SfidaMi.site.

## Funzionalità

- ✅ Aggiungi collaboratori con nome, email e ruolo
- ✅ Visualizza lista di tutti i collaboratori
- ✅ Elimina collaboratori
- ✅ Validazione input (email, campi obbligatori)
- ✅ Prevenzione duplicati (stesso email)
- ✅ Salvataggio persistente (localStorage)
- ✅ Interfaccia responsive
- ✅ Messaggi di feedback per l'utente

## Come Usare

1. Apri `index.html` nel browser
2. Compila il form per aggiungere un nuovo collaboratore:
   - Nome (obbligatorio)
   - Email (obbligatorio, formato email valido)
   - Ruolo (seleziona da: Sviluppatore, Designer, Project Manager, Tester)
3. Clicca "Aggiungi Collaboratore"
4. I collaboratori appariranno nella lista a destra
5. Usa il pulsante "✕" per eliminare un collaboratore

## Ruoli Disponibili

- 💻 **Sviluppatore**: Responsabile dello sviluppo del codice
- 🎨 **Designer**: Responsabile del design e UX/UI
- 👔 **Project Manager**: Responsabile della gestione del progetto
- 🧪 **Tester**: Responsabile del testing e quality assurance

## Tecnologie Utilizzate

- HTML5
- CSS3 (con Grid Layout e Flexbox)
- JavaScript ES6+ (Classes, Local Storage)
- Design responsive per dispositivi mobili

## Struttura File

```
/
├── index.html      # Interfaccia principale
├── style.css       # Stili CSS
├── script.js       # Logica JavaScript
└── README.md       # Documentazione
```

## Caratteristiche Tecniche

- **Persistenza Dati**: I collaboratori vengono salvati nel localStorage del browser
- **Validazione**: Controllo email duplicati e formato email valido
- **Sicurezza**: Escape HTML per prevenire XSS
- **Accessibilità**: Form semantici e navigation da tastiera
- **Performance**: Rendering efficiente della lista collaboratori

## Shortcut Tastiera

- `Ctrl/Cmd + Enter`: Invia form per aggiungere collaboratore

## Sviluppo Futuro

Possibili miglioramenti:
- Export/Import dei dati in JSON
- Filtri e ricerca collaboratori
- Modifica collaboratori esistenti
- Integrazione con API backend
- Notifiche email ai collaboratori