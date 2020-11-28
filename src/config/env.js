const { hostname, pathname } = window.location;

let prefix = '';

if (/^t-/.test(hostname)) {
  prefix = 't-';
} else if (/^localhost/.test(hostname) || /^\d+/.test(hostname)) {
  prefix = 't-';
} else if (/^u-/.test(hostname)) {
  prefix = 'u-';
} else {
  prefix = '';
}

export default {
  prefix,
  API: {
    local: 'localhost:10002',
    dodo: 'https://1002.mp.duoduogai.com',
  }
}