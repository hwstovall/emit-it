export default class EmitIt {
    //Stores all data in event:[subscribers, ...] format
    subscribers = {};

    /**
     *  This function subscribes a subscriber to an event.
     *
     * @param {string} to - The event to which to subscribe
     * @param {function} subscriber - The function that will be executed when the event is emitted
     * @returns {{to: string, index: number, remove: function}} ticket - Ticket containing subscriber information.
     */
    subscribe(to, subscriber) {
        //If the event has not yet been created, create it.
        if (typeof this.subscribers[to] == 'undefined') {
            this.subscribers[to] = [];
        }

        //Add the subscriber to the event
        let index = this.subscribers[to].push(subscriber) - 1;

        //Return the ticket so that the subscriber can be removed using the unsubscribe method later.
        return {
            to,
            index,
            unsubscribe() { return this.unsubscribe({to, index}) }
        }
    }

    /**
     * Unsubscribe a subscriber from an event using a ticket.
     *
     * @param {object} ticket
     * @returns {boolean} unsubscribed - Was the subscriber successfully unsubscribed.
     */
    unsubscribe(ticket) {
        if (typeof this.subscribers[ticket.to][ticket.index] != 'undefined') {
            //Delete the subscriber.
            return delete this.subscribers[ticket.to][ticket.index];
        } else {
            //Subscriber already deleted.
            return true
        }
    }

    /**
     * This function emits the event, triggering all subscribers. It passes the 'this' to the function. This is gives
     * subclasses full access to their data on when an event is emitted.
     *
     * @param {string} event - Event to emmit
     */
    emit(event) {
        //Additional arguments passed to the emit method.
        let args = Array.prototype.slice.call(arguments, 1);

        //Execute each function subscrubed to this event with 'this' and the any additional arguments.
        this.subscribers[event].map((subscriber)=> {
            if (subscriber)
                subscriber(this, ...args);
        }, this);
    }

    /**
     * Gets the event and returns methods to clear and remove the event.
     *
     * @param event The event's name
     * @returns * Actions that can be performed on the event. Of false if no event found.
     */
    event(event) {
        if(!(event in this.subscribers))
            return false;

        let self = this;

        //By default return the event
        return {
            //Delete the selected event
            remove() {
                return delete self.subscribers[event]
            },

            //Clear all subscribers from this event
            clear() {
                self.subscribers[event] = [];
                return true
            }
        }
    }
}