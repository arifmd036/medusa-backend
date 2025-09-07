import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";

export default async function createAdminUser({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const userModuleService = container.resolve(Modules.USER);

  logger.info("Creating admin user...");

  try {
    // Check if admin user already exists
    const existingUsers = await userModuleService.listUsers({
      email: "admin@medusa.com"
    });

    if (existingUsers.length > 0) {
      logger.info("Admin user already exists with email: admin@medusa.com");
      return;
    }

    // Create admin user
    const adminUser = await userModuleService.createUsers({
      email: "admin@medusa.com",
      first_name: "Admin",
      last_name: "User",
    });

    logger.info(`Admin user created successfully with email: admin@medusa.com`);
    logger.info(`User ID: ${adminUser.id}`);
    logger.info("You can now login to the admin panel at http://localhost:9000/app");
    
  } catch (error) {
    logger.error("Failed to create admin user:", error);
  }
}
