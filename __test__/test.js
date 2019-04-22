const Client = require('../src');

const client = new Client({ url: 'ldap://127.0.0.1:10389' });


try {
     client.bind('uid=admin,ou=system', 'secret').then(function() {
        const options = {
            filter: '(&(uid=nick))',
            scope: 'sub',
            attributes: ['sn', 'cn']
          };
        client.search("ou=system",options).then(function(data){
            console.log(JSON.stringify(data));
            client.destroy();
        }).catch(function(error){
            console.error(error);
            client.destroy();
        });

        
     }).catch(function(error){
         console.log(error);
         client.destroy();
     });


  } catch (e) {
      console.log(e);
    console.log('Bind failed');
  }