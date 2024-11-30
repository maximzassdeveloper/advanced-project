import { EntityState } from '@reduxjs/toolkit'
import { Comment, CommentId, User } from './model/types/comment'

export interface NormalData<Item, Id extends string> {
  ids: Id[]
  entities: Record<Id, Item>
}

export const fakeUsers: NormalData<User, string> = {
  ids: ['saturn88', '1dino1'],
  entities: {
    'saturn88': {
      username: 'saturn88',
      fullName: 'Иван',
      description:
        // eslint-disable-next-line
        'if you’re a front-end dev who is “just ballparking it” and not matching fundamental things like font-weight',
      karma: 15,
      postsCount: 20,
      avatar: 'https://source.unsplash.com/man-standing-near-white-wall-d1UPkiFd04A/150x150',
    },
    '1dino1': {
      username: '1dino1',
      karma: 32,
      avatar: 'https://source.unsplash.com/woman-holding-heft-long-blonde-hair-et_78QkMMQs/150x150',
    },
  },
}

export const fakeComments: EntityState<Comment> = {
  ids: ['1', '2', '3', '4', '5'],
  entities: {
    '1': {
      id: '1',
      karma: 21,
      user: fakeUsers.entities['saturn88'],
      createdAt: '2024-06-02T11:40:19+00:00',
      content:
        // eslint-disable-next-line
        'Well, some nuance I guess. From a designer’s point of view, if you’re a front-end dev who is “just ballparking it” and not matching fundamental things like font-weight and page-wide padding/grid/spacing, then that’s not good. not matching fundamental things like font-weight and page-wide padding/grid/spacing, then that’s not good',
      childrenIds: ['2', '4'],
      votes: { downVoted: false, upVoted: false },
    },
    '5': {
      id: '5',
      karma: 100,
      user: fakeUsers.entities['1dino1'],
      createdAt: '2024-05-04T09:40:19+00:00',
      content: 'Well, some nuance I guess. ',
      childrenIds: [],
      parentId: '3',
      votes: { downVoted: false, upVoted: false },
    },
    '2': {
      id: '2',
      karma: 2,
      user: fakeUsers.entities['1dino1'],
      createdAt: '2024-06-01T09:40:19+00:00',
      content: 'Well, some nuance I guess. ',
      childrenIds: ['3'],
      parentId: '1',
      votes: { downVoted: false, upVoted: true },
    },
    '3': {
      id: '3',
      karma: -3,
      user: fakeUsers.entities['saturn88'],
      createdAt: '2024-06-02T14:44:19+00:00',
      content: 'Well, some nuance I guess. From a designer’s point of view',
      parentId: '2',
      childrenIds: ['5'],
      votes: { downVoted: true, upVoted: false },
    },
    '4': {
      id: '3',
      karma: 0,
      user: fakeUsers.entities['saturn88'],
      createdAt: '2024-06-01T09:40:19+00:00',
      content:
        // eslint-disable-next-line
        'Well, some nuance I guess. From a designer’s point of view, if you’re a front-end dev who is “just ballparking it” and not matching fundamental things like font-weight and page-wide padding/grid/spacing, then that’s not good. not matching fundamental things like font-weight and page-wide padding/grid/spacing, then that’s not good',
      parentId: '1',
      votes: { downVoted: false, upVoted: false },
    },
  },
}
