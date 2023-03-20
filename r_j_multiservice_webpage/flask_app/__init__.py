from flask import Flask, render_template, request, redirect, session, flash
from flask_bcrypt import Bcrypt

app = Flask(__name__)
app.secret_key = "But what is grief, if not love persevering?"

bcrypt = Bcrypt(app)