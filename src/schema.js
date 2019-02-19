const { gql } = require('apollo-server');

module.exports = gql`
    type Query {
        user(id: ID!): User
        users: [User!]!
    }

    type Mutation {
        createUser(name: String!, email: String!, password: String!): User
    }

    type User {
        _id: ID!
        name: String!
        email: String!
        password: String!
        entries: [Log!]
    }

    type Log {
        mood: Mood!
        note: String
        postedBy: User
        created: Date
    }

    type Mood {
        # Should 'rating' be an enum range?
        rating: Int!
        # TODO: Do we need 'improvement'?
        improvement: Boolean!
    }

    scalar Date
`;
