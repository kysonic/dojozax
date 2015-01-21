if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (elem, startFrom) {
        var startFrom = startFrom || 0;
        if (startFrom > this.length) return -1;

        for (var i = 0; i < this.length; i++) {
            if (this[i] == elem && startFrom <= i) {
                return i;
            } else if (this[i] == elem && startFrom > i) {
                return -1;
            }
        }
        return -1;
    }
}