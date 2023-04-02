from flask_app.config.mysqlconnection import connectToMySQL
from flask_app import flash
from pprint import pprint

DATABASE = 'recipes'

class Recipe:

    def __init__(self, data):
        self.id = data['id']
        self.name = data['name']
        self.description = data['description']
        self.instruction = data['instruction']
        self.date_made = data['date_made']
        self.quick_meal = data ['quick_meal']
        self.user_id = data['user_id']
        self.first_name = data['first_name']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']

    @classmethod
    def save(cls, data):
        query = 'INSERT INTO recipes (name, description, instruction, date_made, quick_meal, user_id) VALUE (%(name)s, %(description)s, %(instruction)s, %(date_made)s, %(quick_meal)s, %(user_id)s)'
        return connectToMySQL(DATABASE).query_db(query, data)

    @classmethod
    def get_all(cls):
        query = "SELECT * FROM recipes JOIN users ON users.id = recipes.user_id;"
        results = connectToMySQL(DATABASE).query_db(query)
        pprint(results)
        recipes = []
        for recipe in results:
            recipes.append(cls(recipe))
        return recipes
    
    @classmethod
    def get_one(cls, data):
        query = "SELECT * FROM recipes JOIN users ON users.id = recipes.user_id WHERE recipes.id = %(id)s;"
        result = connectToMySQL(DATABASE).query_db(query, data)
        pprint(result)
        recipe =cls(result[0])
        print(recipe)
        return recipe

    #  ! UPDATE
    @classmethod
    def update(cls, data):
        query = "UPDATE recipes SET name = %(name)s, description = %(description)s, instruction = %(instruction)s, date_made = %(date_made)s, quick_meal = %(quick_meal)s WHERE id = %(id)s;"
        return connectToMySQL(DATABASE).query_db(query,data)
    # DELETE
    @classmethod
    def delete(cls,data):
        query = "DELETE FROM recipes WHERE id = %(id)s;"
        return connectToMySQL(DATABASE).query_db(query,data)
        
    @staticmethod
    def validate_recipe(recipe:dict) -> bool:
        is_valid = True
        if len(recipe['name']) < 3:
            is_valid = False
            flash("Name must be three characters")
        if len(recipe['description']) < 3:
            is_valid = False
            flash('Description must be more than 3 characters')
        if len(recipe['instruction']) < 3:
            is_valid = False
            flash('Instructions must be more than 3 characters')
        if len(recipe['date_made']) == '':
            is_valid = False
            flash('Date field cannot be empty')
        if not 'quick_meal' in recipe:
            is_valid = False
            flash('Under 30 field cannot be empty')
            #validating integers
            #if int(recipe['number_served']<=0):
            #is_valid = False
            #flash('recipe has to serve at least 1 person')
        return is_valid

    