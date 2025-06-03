document.addEventListener('DOMContentLoaded', () => {
    const dayNavigation = document.querySelector('.day-navigation');
    const scheduleDisplay = document.getElementById('schedule-display');

    // Datos de eventos actualizados con las fechas especificadas
    const events = {
        '2025-05-24': [ // Sábado 24 de mayo
            {
                time: '08:00 AM - 2:00 PM',
                title: '1° Fase de Audición - Día 1',
               
                description: 'Sesión de canto individual.'
            },
            {
                time: '2:00 PM - 4:00 PM',
                title: '2° Fase de Audición - Día 1',
                
                description: 'Sesión de percusión corporal.'
            }
           
        ],
        '2025-05-25': [ // Domingo 25 de mayo
            {
                time: '08:00 AM - 2:00 PM',
                title: '1° Fase de Audición - Día 2',
                
                description: 'Sesión de canto individual.'
            },
            {
                time: '2:00 PM - 4:00 PM',
                title: '2° Fase de Audición - Día 2',
                speaker: '',
                description: 'Sesión de percusión corporal.'
            }
        ],
        '2025-05-27': [ // Martes 27 de mayo
            {
                time: '5:30 PM - 8:40 PM',
                title: '1° Fase de Callback - Día 1',
               
                description: 'Escenas de actuación - Día 1'
            },
            {
                time: '8:40 PM - 10:30 PM',
                title: '2° Fase de Callback - Día 1',
                
                description: 'Prueba de armonías - Día 1.'
            }
        ],
        '2025-05-28': [ // Miércoles 28 de mayo
            {
                time: '5:30 PM - 8:40 PM',
                title: '1° Fase de Callback - Día 2',
                
                description: 'Escenas de actuación - Día 1.'
            },
            {
                time: '8:40 PM - 10:30 PM',
                title: '2° Fase de Callback - Día 2',
                
                description: 'Prueba de armonías - Día 2.'
            }
        ],
        '2025-05-29': [ // Jueves 29 de mayo
            {
                time: '6:00 PM - 9:00 PM',
                title: 'Workshop: Percusión Corporal.',
                speaker: 'Carlos Bausyz',
                description: 'Introducción a la percusión corporal.'
            }
        ],
        '2025-05-31': [ // Sábado 31 de mayo
            {
                time: '08:00 AM - 9:00 AM',
                title: 'Callback Extraordinario',
               
                description: 'Escenas de actuación y armonías.'
            },
            {
                time: '9:00 AM - 12:00 MD',
                title: 'Workshop: Percusión Corporal.',
                speaker: 'Carlos Bausyz',
                
                description: 'Introducción a la percusión corporal.'
            }
        ]
    };

    // Helper function to format date for display
    function formatDate(dateString) {
        // We add 'T00:00:00' to the date string to ensure it's parsed as a local date
        // and avoids potential timezone issues that might shift the day.
        const date = new Date(dateString + 'T00:00:00');
        const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('es-ES', options);
    }

    // Generate day buttons
    function renderDayButtons() {
        dayNavigation.innerHTML = ''; // Clear existing buttons
        const sortedDates = Object.keys(events).sort(); // Sort dates chronologically

        sortedDates.forEach(date => {
            const button = document.createElement('button');
            button.classList.add('day-button');
            button.dataset.date = date; // Store the date for easy retrieval
            button.textContent = formatDate(date).split(',')[0]; // Just the day of the week, e.g., "sábado"

            // Add full date as a tooltip or custom attribute for accessibility/info
            button.title = formatDate(date); // Tooltip on hover

            button.addEventListener('click', () => {
                displayEventsForDay(date);
                // Remove active class from all buttons
                document.querySelectorAll('.day-button').forEach(btn => btn.classList.remove('active'));
                // Add active class to the clicked button
                button.classList.add('active');
            });
            dayNavigation.appendChild(button);
        });

        // Automatically select the first day or current day if applicable
        if (sortedDates.length > 0) {
            const today = new Date().toISOString().split('T')[0];
            const currentDayButton = document.querySelector(`.day-button[data-date="${today}"]`);

            if (currentDayButton) {
                currentDayButton.click(); // Click today's button if it exists
            } else {
                dayNavigation.firstChild.click(); // Otherwise, click the first day
            }
        }
    }

    // Display events for a selected day
    function displayEventsForDay(date) {
        scheduleDisplay.innerHTML = ''; // Clear previous events
        const dailyEvents = events[date];

        if (dailyEvents && dailyEvents.length > 0) {
            dailyEvents.forEach(event => {
                const eventCard = document.createElement('div');
                eventCard.classList.add('event-card');
                eventCard.innerHTML = `
                    <p class="time">${event.time}</p>
                    <h3>${event.title}</h3>

                    <p class="description">${event.description}</p>
                `;
                scheduleDisplay.appendChild(eventCard);
            });
        } else {
            scheduleDisplay.innerHTML = `
                <p class="no-events-message">No hay eventos programados para esta fecha.</p>
            `;
        }
    }

    // Initialize the schedule
    renderDayButtons();
});