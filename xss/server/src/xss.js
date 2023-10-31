const xss = () => {
    class Require {
        #xhr = new XMLHttpRequest();

        post(option) {
            return new Promise((resolve, reject) => {
                try {
                    this.#xhr.open("POST", `${baseURL + option.url}`)
                    this.#xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                    this.watchStateChangeHandler(resolve, reject)
                    this.#xhr.send(JSON.stringify(option.data));
                } catch (error) {
                    reject(error)
                }
            })
        }

        /**
         * @abstract get 请求
         * @param OptionInf 
         */
        get(option) {
            return new Promise((resolve, reject) => {
                try {
                    this.#xhr.open("GET", `${baseURL + option.url + "?" + objectToQueryString(option?.data || "")}`)
                    this.watchStateChangeHandler(resolve, reject)
                    this.#xhr.send();
                } catch (error) {
                    reject(error)
                }
            })
        }

        watchStateChangeHandler(resolve, reject) {
            this.#xhr.onreadystatechange = () => {
                if (this.#xhr.readyState === XMLHttpRequest.DONE) {
                    if (this.#xhr.status === 200) {
                        if (this.#xhr.response?.length) {
                            resolve(JSON.parse(this.#xhr.response))
                        }
                    } else {
                        reject()
                    }
                }
            };
        }
    }

    new Require().get()
};

module.exports = xss;