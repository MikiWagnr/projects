from flask_app import app, render_template, redirect, session, request
from flask_app.models.job import Job

@app.route('/')
def home_page():
    return render_template('index.html')

@app.route('/gallery')
def gallery_page():
    return render_template('gallery.html')

@app.route('/contact')
def contact_page():
    return render_template('contact.html')

@app.route('/faq')
def faq_page():
    return render_template('faq.html')

@app.route('/sign_in')
def sign_in_page():
    return render_template('sign_in.html')

@app.route('/register')
def register_page():
    return render_template('register.html')

@app.route('/feedback')
def feedback_page():
    return render_template('feedback.html')

@app.route('/jobs')
def jobs_page():
    if 'user_id' not in session:
        return redirect('/logout')
    
    return render_template('jobs.html')

@app.route('/job/new', methods = ['POST'])
def new_job():
    print(request.form)
    if not Job.validate_job(request.form):
        return redirect('/jobs')
    request.form.getlist('job')
    print(request.form.getlist('job'))
    new_job = Job.save(request.form)
    for job in request.form.getlist('job'):
        print(job, session['user_id'])
        Job.add_service_to_job({'job_id':new_job ,'service_id':job})

    return redirect('/')
