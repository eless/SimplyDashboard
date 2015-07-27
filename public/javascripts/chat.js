/**
 * Created by Eless on 20.07.2015.
 */
 function chatEvents() {
    io.on('connect', function () {
        io.on('newMessage', function (msg) {
            document.querySelector('#log').innerHTML += new Date().timeNow() + ' <span class="username">' + msg.name + '</span>' + ': ' + msg.text + '<br>';
            document.querySelector('#log').scrollTop = document.querySelector('#log').scrollHeight;
        });
        document.querySelector('#input').onkeypress = function (e) {
            if (e.which == '13') {
                var name = document.querySelector('#name').value;
                if (name != '') {
                    var text = document.querySelector('#input').value;
                    io.emit('sendNewMessage', [name, text]);
                    document.querySelector('#input').value = '';
                } else {
                    document.querySelector('#log').innerHTML += '<span class="username">Enter your username</span><br>';
                }
            }
        };
        document.querySelector('#send').onclick = function () {
            var name = document.querySelector('#name').value;
            if (name != '') {
                io.emit('sendNewMessage', [name, document.querySelector('#input').value]);
                document.querySelector('#input').value = '';
            } else {
                document.querySelector('#log').innerHTML += '<span class="username">Enter your username</span><br>';
            }
        };
    });
    Date.prototype.timeNow = function () {
        return ((this.getHours() < 10)?"0":"") + this.getHours() + ":"
            + ((this.getMinutes() < 10)?"0":"") + this.getMinutes() + ":"
            + ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
    }
}
