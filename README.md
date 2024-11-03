#### Steps took to deploy this application

##### Infrastructure:
1. Created a VPC with a AZ's with 4 subnets where 2 of them are private and 2 of them were public.
2. Created a NAT gateway in the public subnet so that the service inside the private subnet can access the internet to fetch the application image.
3. Created a ECS cluster.
4. Created a Task definitions for both of the React and Node js Application while setting up the env variables.
5. Setup a Load balancer along with SSL for the ECS services and path based routing to different target groups created for both the frontend and backend. 
6. Created services for each task definition in the public and private subnets along with a common Load balancer, attached its respective target groups and also attached a security group for each service.
7. Attached a seperate security group to the ECS load balancer as well.