const Hapi = require('@hapi/hapi');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    await server.register({
        plugin: require('hapi-mongodb'),
        options: {
          url: 'mongodb+srv://ajax625:MS2WRr1vsATOtt3x@cluster0.jtdx9.mongodb.net/sample_mflix?retryWrites=true&w=majority',
          settings: {
              useUnifiedTopology: true
          },
          decorate: true
        }
    });

// Get all movies
server.route({
    method: 'GET',
    path: '/movies',
    handler: async (req, h) => {

      const offset = Number(req.query.offset) || 0;

      const movies = await req.mongo.db.collection('movies').find({}).sort({metacritic:-1}).skip(offset).limit(20).toArray();

      return movies;
    }
});

    // Add a new movie to the database
    server.route({
        method: 'POST',
        path: '/movies',
        handler: (req, h) => {

            return 'Add new movie';
        }
    });

// Get a single movie
server.route({
    method: 'GET',
    path: '/movies/{id}',
    handler: async (req, h) => {
        const id = req.params.id
        const ObjectID = req.mongo.ObjectID;

        const movie = await req.mongo.db.collection('movies').findOne({_id: new ObjectID(id)},{projection:{title:1,plot:1,cast:1,year:1, released:1}});

        return movie;
    }
});

    // Update the details of a movie
    server.route({
        method: 'PUT',
        path: '/movies/{id}',
        handler: (req, h) => {

            return 'Update a single movie';
        }
    });

    // Delete a movie from the database
    server.route({
        method: 'DELETE',
        path: '/movies/{id}',
        handler: (req, h) => {

            return 'Delete a single movie';
        }
    });

    // Search for a movie
    server.route({
        method: 'GET',
        path: '/search',
        handler: (req, h) => {

            return 'Return search results for the specified term';
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
}

init();  