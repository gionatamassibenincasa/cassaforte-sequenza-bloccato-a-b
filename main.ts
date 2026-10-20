/**
 * Costruisci una Cassaforte Digitale.
 * 
 * - La cassaforte si sblocca (mostrando l'icona Yes) se e solo se l'utente inserisce la combinazione ordinata A seguita da B a partire dalla stato bloccato.
 * 
 * - Qualsiasi pressione errata (es. premere B come prima scelta, premere A nello stato di attesa di B) mantiene il sistema bloccato.
 * 
 * - Una volta aperta, la cassaforte può essere bloccata premendo A+B.
 */
// Lucchetto chiuso
input.onButtonPressed(Button.A, function () {
    if (stato == 0) {
        stato = 1
        // Primo simbolo corretto
        basic.showIcon(IconNames.Diamond)
    } else if (stato == 1) {
        // Sequenza ripetuta: l'ultimo 'A' vale come inizio
        stato = 0
        // Cassaforte bloccata
        basic.showIcon(IconNames.No)
    }
})
/**
 * Codifica stati: 0 = Bloccato, 1 = Attesa B (dopo aver premuto A), 2 = Sbloccato
 */
// Comando di reset/chiusura universale
input.onButtonPressed(Button.AB, function () {
    stato = 0
    // Cassaforte bloccata
    basic.showIcon(IconNames.No)
})
// Se lo stato precente è 1, sbocca
input.onButtonPressed(Button.B, function () {
    if (stato == 1) {
        stato = 2
        // Combinazione corretta: sblocco!
        basic.showIcon(IconNames.Yes)
        music.playTone(523, music.beat(BeatFraction.Whole))
    } else if (stato == 0) {
        stato = 0
        // Errore: resta bloccato
        basic.showIcon(IconNames.No)
    }
})
let stato = 0
// Lucchetto chiuso
basic.showIcon(IconNames.No)
