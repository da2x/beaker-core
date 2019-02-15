module.exports = {
  '$schema': 'http://json-schema.org/draft-07/schema#',
  '$id': 'dat://unwalled.garden/comment.json',
  'type': 'object',
  'title': 'Comment',
  'description': 'A text post about some resource.',
  'required': [
    'type',
    'topic',
    'content',
    'createdAt'
  ],
  'properties': {
    'type': {
      'type': 'string',
      'title': "The object's type",
      'const': 'unwalled.garden/comment'
    },
    'topic': {
      'type': 'string',
      'title': 'What this comment is about',
      'format': 'uri',
      'examples': [
        'dat://beakerbrowser.com'
      ]
    },
    'replyTo': {
      'type': 'string',
      'title': 'What this comment is replying to',
      'format': 'uri',
      'examples': [
        'dat://beakerbrowser.com'
      ]
    },
    'content': {
      'type': 'string',
      'title': "The comment's content"
    },
    'createdAt': {
      'type': 'string',
      'format': 'date-time',
      'title': "The time of this post's creation"
    },
    'updatedAt': {
      'type': 'string',
      'format': 'date-time',
      'title': "The time of this post's last edit"
    }
  },
  'additionalProperties': false
}