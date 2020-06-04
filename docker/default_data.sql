-- Enums
insert into public.impact (name, value) values ('Low', 1);
insert into public.impact (name, value) values ('Moderate', 2);
insert into public.impact (name, value) values ('High', 3);
insert into public.probability (name, value) values ('Very unlikely', 1);
insert into public.probability (name, value) values ('Unlikely', 2);
insert into public.probability (name, value) values ('Medium likelihood', 3);
insert into public.probability (name, value) values ('Likely', 4);
insert into public.probability (name, value) values ('Very likely', 5);
insert into public.severity (name, value) values ('Minor', 1);
insert into public.severity (name, value) values ('Moderate', 2);
insert into public.severity (name, value) values ('Critical', 3);

-- Users
insert into public.user (login, password) values ('Piotr', 'pwd');
insert into public.user (login, password) values ('Jan', 'pwd');
insert into public.user (login, password) values ('Kuba', 'pwd');
insert into public.user (login, password) values ('Seba', 'pwd');
insert into public.user (login, password) values ('Marcin', 'pwd');

-- Projects, registers, risks and responses
insert into public.project (name, description) values ('Moon base', 'Building an operational, self sustainable moon base... on the moon!');
insert into public.project (name, description) values ('Mars orbital station', 'Building an orbital station on the orbit of Mars');
insert into public.risk_register (project_id, name, description) values (1, 'Transport risks', 'Risks regarding transportation of people and equipment to the moon');
insert into public.risk_register (project_id, name, description) values (1, 'Habitat risks', 'Risks regarding building and sustaining a permanent habitat on the moon');
insert into public.risk_register (project_id, name, description) values (2, 'Orbital risks', 'It is difficult to position the station properly, isn''t it?');
insert into public.risk (register_id, date_raised, name, description, status, impact_id, probability_id, severity_id) values (1, '2020-04-28', 'Lack of funds for rockets', 'Rockets are pretty expensive and we''re gonna need a lot of them', 'Assessed by financial department, TBD by end of May', 3, 4, 2);
insert into public.risk (register_id, date_raised, name, description, status, impact_id, probability_id, severity_id) values (1, '2020-04-29', 'Rocket breakdown', 'Rockets are complex and prone to malfunction', 'Engineering department is coming up with tests (april 2020)', 1, 1, 3);
insert into public.risk (register_id, date_raised, name, description, status, impact_id, probability_id, severity_id) values (2, '2020-04-27', 'Lack of trained crew', 'It is difficult to find the right crew for such a dangerous mission', 'HR has difficulties to find crew as for 04.2020', 3, 2, 3);
insert into public.risk (register_id, date_raised, name, description, status, impact_id, probability_id, severity_id) values (1, '2020-04-01', 'Launchpad taken', 'Launchpad in the space launch center might be reserved by another company for a long time, we might have a problem finding suitable time window', 'To be assessed, we are in contact with the space center', 1, 2, 1);
insert into public.risk (register_id, date_raised, name, description, status, impact_id, probability_id, severity_id) values (2, '2020-04-28', 'Radiation exposure', 'Equipment may break down due to space radiation', 'To be assessed', 2, 3, 1);
insert into public.risk_property (risk_id, name, description, quantiative_value) values (1, 'Funds needed', 'In $ billions', 150);
insert into public.risk_property (risk_id, name, description, quantiative_value) values (1, 'Loan interest rates', 'Our company has some problems with loans, the best we can do right now is about 12%', null);
insert into public.risk_property (risk_id, name, description, quantiative_value) values (2, 'Crew needed', 'Amount of necessary crew members', 24);
insert into public.response (risk_id, name, description, expected_result, progress) values (1, 'Kickstarter', 'Launch a kickstarter campaign!', 'Some additional funds', 'To be done');
insert into public.response (risk_id, name, description, expected_result, progress) values (1, 'Outsource R&D team', 'Outsource our R&D team in order to make some additional cash', 'Additional cash inflow, slower progress on our R&D projects', 'Decision to be made, client found');
insert into public.response (risk_id, name, description, expected_result, progress) values (2, 'Free pizza', 'Offer free pizza for life for the crew and their families', 'Some minor additional costs, possible rise in job applications for crew members', 'Is it really a good idea?');

-- User - Project assignments
insert into public.user_project (user_id, project_id) values (1, 1);
insert into public.user_project (user_id, project_id) values (2, 1);
insert into public.user_project (user_id, project_id) values (3, 1);
insert into public.user_project (user_id, project_id) values (4, 1);
insert into public.user_project (user_id, project_id) values (5, 1);
insert into public.user_project (user_id, project_id) values (1, 2);
insert into public.user_project (user_id, project_id) values (2, 2);