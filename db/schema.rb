# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20141126174739) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "contacts", force: true do |t|
    t.integer  "user_id",    null: false
    t.integer  "friend_id",  null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "contacts", ["friend_id"], name: "index_contacts_on_friend_id", using: :btree
  add_index "contacts", ["user_id"], name: "index_contacts_on_user_id", using: :btree

  create_table "events", force: true do |t|
    t.integer  "user_id"
    t.string   "title"
    t.string   "location"
    t.string   "time"
    t.date     "date"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "photo_id"
  end

  add_index "events", ["user_id"], name: "index_events_on_user_id", using: :btree

  create_table "messages", force: true do |t|
    t.integer  "sender_id",   null: false
    t.integer  "receiver_id", null: false
    t.string   "subject"
    t.text     "body"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "messages", ["receiver_id"], name: "index_messages_on_receiver_id", using: :btree
  add_index "messages", ["sender_id"], name: "index_messages_on_sender_id", using: :btree

  create_table "photos", force: true do |t|
    t.integer  "profile_id"
    t.string   "pic_file_name"
    t.string   "pic_content_type"
    t.integer  "pic_file_size"
    t.datetime "pic_updated_at"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "photos", ["profile_id"], name: "index_photos_on_profile_id", using: :btree

  create_table "profiles", force: true do |t|
    t.text     "about"
    t.string   "gender"
    t.integer  "age"
    t.string   "location"
    t.boolean  "established",      default: false, null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "primary_photo_id"
    t.integer  "user_id"
    t.string   "name"
  end

  add_index "profiles", ["user_id"], name: "index_profiles_on_user_id", unique: true, using: :btree

  create_table "requests", force: true do |t|
    t.integer  "sender_id",                       null: false
    t.integer  "receiver_id",                     null: false
    t.boolean  "invitation",                      null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "status",      default: "pending"
    t.string   "details"
    t.integer  "event_id"
  end

  add_index "requests", ["event_id"], name: "index_requests_on_event_id", using: :btree
  add_index "requests", ["receiver_id"], name: "index_requests_on_receiver_id", using: :btree
  add_index "requests", ["sender_id"], name: "index_requests_on_sender_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "session_token",   null: false
    t.string   "password_digest", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "provider"
    t.string   "uid"
    t.string   "email"
    t.datetime "last_login"
  end

  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree

end
