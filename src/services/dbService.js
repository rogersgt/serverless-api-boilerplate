import { Document } from 'dynamoose/dist/Document'; // eslint-disable-line no-unused-vars
import DBItem from '../models/DBItem';
import { v4 as uuid } from 'uuid';

/**
 *
 * @param {String} PK Hash Key of the DynamoDB Item
 * @param {String} SK Optional Range Key of the DynamoDB Item
 * @param {object} filter Properties to filter by
 * @param {object} lastObject last DynamoDB Item provided in a paginated request
 * @return {Promise<Document|Document[]>} Query Results
 */
export function query(PK, SK, filter = {}, lastObject) {
  if (lastObject && !SK) {
    return DBItem.query({
      PK,
      ...filter,
    })
      .startAt(lastObject)
      .all()
      .exec();
  }

  if (!SK) {
    return DBItem.query({
      PK,
      ...filter,
    })
      .all()
      .exec();
  }

  return DBItem.query({
    PK,
    SK,
    ...filter,
  })
    .exec();
}

/**
 *
 * @param {String} PK Hash Key of the DynamoDB Item (i.e. "Users", "Cats", etc.)
 * @param {String} SK Range Key of the DynamoDB Item (defaults to a uuid)
 * @param {object} extraProps Mapping of additional properties to set
 * @return {Promise<Document>} New Document
 */
export function create(PK, SK = uuid(), extraProps = {}) {
  const item = new DBItem({
    PK,
    SK,
    ...extraProps,
  });
  return item.save();
}

export function update(key = { PK: '', SK: '' }, updateObj = {}) {
  return DBItem.update(key, updateObj);
}

/**
 * @param {String} PK Hash Key of the DynamoDB Item to delete
 * @param {String} SK Range Key of the DynamoDB Item to delete
 * @return {Promise<void>}
 */
export function deleteItem(PK, SK) {
  return DBItem.delete({ PK, SK });
}
