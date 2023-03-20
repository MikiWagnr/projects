from flask_app.config.mysqlconnection import connectToMySQL
from flask_app import flash
from pprint import pprint

DATABASE = 'r_and_j_multiservice'

class Job:

    def __init__(self, data):
        self.id = data['id']
        self.home_type = data['home_type']
        self.rooms = data['rooms']
        self.comments = data['comments']
        self.user_id = data['user_id']
        self.first_name = data['first_name']
        self.last_name = data['last_name']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']

    @classmethod
    def save(cls, data):
        query = 'INSERT INTO jobs (home_type, rooms, comments, user_id) VALUE (%(home_type)s, %(rooms)s, %(comments)s, %(user_id)s)'
        return connectToMySQL(DATABASE).query_db(query, data)

    @classmethod
    def get_all(cls):
        query = "SELECT * FROM jobs JOIN users ON users.id = jobs.user_id;"
        results = connectToMySQL(DATABASE).query_db(query)
        pprint(results)
        jobs = []
        for job in results:
            jobs.append(cls(job))
        return jobs
    
    @classmethod
    def get_one(cls, data):
        query = "SELECT * FROM jobs JOIN users ON users.id = jobs.user_id WHERE jobs.id = %(id)s;"
        result = connectToMySQL(DATABASE).query_db(query, data)
        pprint(result)
        job = cls(result[0])
        print(job)
        return job

    #  ! UPDATE
    @classmethod
    def update(cls, data):
        query = "UPDATE jobs SET home_type = %(home_type)s, rooms = %(rooms)s, comments = %(comments)s WHERE id = %(id)s;"
        return connectToMySQL(DATABASE).query_db(query,data)
    # DELETE
    @classmethod
    def delete(cls,data):
        query = "DELETE FROM jobs WHERE id = %(id)s;"
        return connectToMySQL(DATABASE).query_db(query,data)
        
    @staticmethod
    def validate_job(job:dict) -> bool:
        is_valid = True
        if len(job['home_type']) < 2:
            is_valid = False
            flash("Name must be 2 characters")
        # if len(job['job']) < 10:
        #     is_valid = False
            flash('job must be more than 10 characters')
        if len(job['rooms']) < 1:
            is_valid = False
            flash('rooms must be more than 3 characters')
            #validating integers
        if int(job['rooms']) < 1:
            is_valid = False
            flash('rooms has to be more than 0')
        return is_valid

    @classmethod
    def add_service_to_job(cls, data):
        query ="INSERT INTO services_has_jobs (service_id, job_id) VALUES (%(service_id)s, %(job_id)s );"
        return connectToMySQL(DATABASE).query_db(query, data)

    