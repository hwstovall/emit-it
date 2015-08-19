'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var EmitIt = (function () {
    function EmitIt() {
        _classCallCheck(this, EmitIt);

        this.subscribers = {};
    }

    _createClass(EmitIt, [{
        key: 'subscribe',

        /**
         *  This function subscribes a subscriber to an event.
         *
         * @param {string} to - The event to which to subscribe
         * @param {function} subscriber - The function that will be executed when the event is emitted
         * @returns {{to: string, index: number, remove: function}} ticket - Ticket containing subscriber information.
         */
        value: function subscribe(to, subscriber) {
            //If the event has not yet been created, create it.
            if (typeof this.subscribers[to] == 'undefined') {
                this.subscribers[to] = [];
            }

            //Add the subscriber to the event
            var index = this.subscribers[to].push(subscriber) - 1;

            //Return the ticket so that the subscriber can be removed using the unsubscribe method later.
            return {
                to: to,
                index: index,
                unsubscribe: function unsubscribe() {
                    return this.unsubscribe({ to: to, index: index });
                }
            };
        }

        /**
         * Unsubscribe a subscriber from an event using a ticket.
         *
         * @param {object} ticket
         * @returns {boolean} unsubscribed - Was the subscriber successfully unsubscribed.
         */
    }, {
        key: 'unsubscribe',
        value: function unsubscribe(ticket) {
            if (typeof this.subscribers[ticket.to][ticket.index] != 'undefined') {
                //Delete the subscriber.
                return delete this.subscribers[ticket.to][ticket.index];
            } else {
                //Subscriber already deleted.
                return true;
            }
        }

        /**
         * This function emits the event, triggering all subscribers. It passes the 'this' to the function. This is gives
         * subclasses full access to their data on when an event is emitted.
         *
         * @param {string} event - Event to emmit
         */
    }, {
        key: 'emit',
        value: function emit(event) {
            var _this = this;

            //Additional arguments passed to the emit method.
            var args = Array.prototype.slice.call(arguments, 1);

            //Execute each function subscrubed to this event with 'this' and the any additional arguments.
            this.subscribers[event].map(function (subscriber) {
                if (subscriber) subscriber.apply(undefined, [_this].concat(_toConsumableArray(args)));
            }, this);
        }

        /**
         * Gets the event and returns methods to clear and remove the event.
         *
         * @param event The event's name
         * @returns * Actions that can be performed on the event. Of false if no event found.
         */
    }, {
        key: 'event',
        value: function event(_event) {
            if (!(_event in this.subscribers)) return false;

            var self = this;

            //By default return the event
            return {
                //Delete the selected event
                remove: function remove() {
                    return delete self.subscribers[_event];
                },

                //Clear all subscribers from this event
                clear: function clear() {
                    self.subscribers[_event] = [];
                    return true;
                }
            };
        }
    }]);

    return EmitIt;
})();

exports['default'] = EmitIt;
module.exports = exports['default'];

//Stores all data in event:[subscribers, ...] format