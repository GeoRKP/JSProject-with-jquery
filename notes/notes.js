let noteId = 0
const daysGR = ['Κυριακή', 'Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασεκυή', 'Σάββατο']
const monthsGR = ['Ιανουαρίου', 'Φεβρουαρίου', 'Μαρτίου', 'Απριλίου', 'Μαΐου', 'Ιουνίου', 
                  'Ιουλίου', 'Αυγούστου', 'Σεπτεμβρίου', 'Οκρωβρίου', 'Νοεμβρίου', 'Δεκεμβρίου']

$(document).ready(function() {

    setInterval(printGRDate, 1000) // 1000 ms === 1 sec

    $('#addNoteBtn').on('click', function() {
        insertNote($('#inputNote').val().trim())
        reset() 
    })

    $('#inputNote').on('keyup', function(e) {
        if (e.key === 'Enter') {
            insertNote($(this).val().trim())
            reset()
        }
    })
})

function printGRDate() {
    const currentDate = new Date()
    const day = currentDate.getDay()
    const date = currentDate.getDate()
    const month = currentDate.getMonth()
    const year = currentDate.getFullYear()
    const hours = currentDate.getHours()
    const minutes = currentDate.getMinutes()
    const seconds = currentDate.getSeconds()

    const strDay = daysGR[day]
    const strMonth = monthsGR[month]
    let strDate = `${strDay}, ${date} ${strMonth} ${year}`
    let strTime = `${(hours < 10) ? '0' : ''}${hours}:${(minutes < 10) ? 0 : ''}${minutes}:${(seconds < 10) ? 0 : ''}${seconds}`
    
    $('#dateText').html(strDate + "<br>" + strTime) 
}

function insertNote(note) {
    if (!note) {
        return
    }

    noteId++

    let clone = $('.note.hidden').clone(true)
    clone.removeClass('hidden')
    clone.find('.note-check').on('click', function() {
        strikeThrough(clone.find('.note-text'))
    })

    let clonedNoteInfo = clone.find('.note-info');
    clonedNoteInfo.children().eq(0).attr('id', 'noteCheck' + noteId)
    clonedNoteInfo.children().eq(1).attr('for', 'noteCheck' + noteId)

    let clonedBtn = clone.find('.notedel-btn');
    clonedBtn.attr('id', 'noteDelBtn' + noteId);
    clonedBtn.on('click', function() {
      deleteNote($(this).parent());
    })

    clone.find('.note-text').html(note)
    $('.notes-wrapper').append(clone)
}

function strikeThrough(element) {
    element.toggleClass('line-through')
}

function deleteNote(note) {
    $(note).remove()
}

function reset() {
    $('#inputNote').val('')
}