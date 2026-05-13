import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Organization from './src/models/Organization.js';
import User from './src/models/User.js';
import Branch from './src/models/Branch.js';
import Product from './src/models/Product.js';
import ProductCategory from './src/models/ProductCategory.js';
import Customer from './src/models/Customer.js';
import Supplier from './src/models/Supplier.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    // Clear existing data
    await Organization.deleteMany({});
    await User.deleteMany({});
    await Branch.deleteMany({});
    await Product.deleteMany({});
    await ProductCategory.deleteMany({});
    await Customer.deleteMany({});
    await Supplier.deleteMany({});

    // Create Organization
    const organization = await Organization.create({
      name: 'NexaCore Demo Pharmacy',
      businessType: 'pharmacy',
      email: 'demo@nexacore.com',
      subscription: {
        plan: 'pro',
        status: 'active',
        startDate: new Date(),
        renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
      settings: {
        currency: 'USD',
        timezone: 'UTC',
        taxType: 'VAT',
        taxRate: 10,
      },
      modules: {
        inventory: true,
        pos: true,
        orders: true,
        customers: true,
        suppliers: true,
        analytics: true,
        pharmacy: true,
        prescriptions: true,
      },
    });

    // Create Owner User
    const owner = await User.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'demo@nexacore.com',
      password: 'demo123456',
      organization: organization._id,
      role: 'owner',
      isActive: true,
    });

    organization.owner = owner._id;
    await organization.save();

    // Create Branch
    const branch = await Branch.create({
      name: 'Main Pharmacy',
      organization: organization._id,
      address: '123 Medical Street',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'USA',
      phone: '+1-555-0100',
      email: 'pharmacy@nexacore.com',
      manager: owner._id,
    });

    // Create Staff Users
    const cashier = await User.create({
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'cashier@nexacore.com',
      password: 'demo123456',
      organization: organization._id,
      branch: branch._id,
      role: 'cashier',
      isActive: true,
    });

    const storekeeper = await User.create({
      firstName: 'Bob',
      lastName: 'Johnson',
      email: 'storekeeper@nexacore.com',
      password: 'demo123456',
      organization: organization._id,
      branch: branch._id,
      role: 'storekeeper',
      isActive: true,
    });

    // Create Product Categories
    const medicinesCategory = await ProductCategory.create({
      name: 'Medicines',
      description: 'Prescription and OTC medicines',
      organization: organization._id,
    });

    const supplementsCategory = await ProductCategory.create({
      name: 'Supplements',
      description: 'Vitamins and dietary supplements',
      organization: organization._id,
    });

    // Create Products
    const products = await Product.insertMany([
      {
        name: 'Ibuprofen 200mg',
        genericName: 'Ibuprofen',
        strength: '200mg',
        dosageForm: 'tablet',
        manufacturer: 'Generic Labs',
        sku: 'IBU-200',
        barcode: '1234567890001',
        category: medicinesCategory._id,
        organization: organization._id,
        quantity: 150,
        minStockLevel: 20,
        buyingPrice: 2.5,
        sellingPrice: 5.99,
        unitType: 'pieces',
        tax: 5,
      },
      {
        name: 'Vitamin C 1000mg',
        genericName: 'Ascorbic Acid',
        strength: '1000mg',
        dosageForm: 'tablet',
        manufacturer: 'Healthy Life',
        sku: 'VIT-C1000',
        barcode: '1234567890002',
        category: supplementsCategory._id,
        organization: organization._id,
        quantity: 200,
        minStockLevel: 30,
        buyingPrice: 3.0,
        sellingPrice: 7.99,
        unitType: 'pieces',
        tax: 5,
      },
      {
        name: 'Paracetamol 500mg',
        genericName: 'Paracetamol',
        strength: '500mg',
        dosageForm: 'tablet',
        manufacturer: 'Generic Labs',
        sku: 'PAR-500',
        barcode: '1234567890003',
        category: medicinesCategory._id,
        organization: organization._id,
        quantity: 80,
        minStockLevel: 20,
        buyingPrice: 2.0,
        sellingPrice: 4.99,
        unitType: 'pieces',
        tax: 5,
      },
      {
        name: 'Multivitamin Daily',
        genericName: 'Multivitamin',
        strength: 'Multi',
        dosageForm: 'tablet',
        manufacturer: 'Health Plus',
        sku: 'MULTI-D',
        barcode: '1234567890004',
        category: supplementsCategory._id,
        organization: organization._id,
        quantity: 120,
        minStockLevel: 25,
        buyingPrice: 4.5,
        sellingPrice: 9.99,
        unitType: 'pieces',
        tax: 5,
      },
      {
        name: 'Cough Syrup 200ml',
        genericName: 'Dextromethorphan',
        strength: '15mg/5ml',
        dosageForm: 'syrup',
        manufacturer: 'Generic Labs',
        sku: 'COUGH-200',
        barcode: '1234567890005',
        category: medicinesCategory._id,
        organization: organization._id,
        quantity: 45,
        minStockLevel: 10,
        buyingPrice: 3.5,
        sellingPrice: 7.99,
        unitType: 'pieces',
        tax: 5,
      },
    ]);

    // Create Suppliers
    const supplier1 = await Supplier.create({
      name: 'Generic Pharma Ltd',
      email: 'sales@genericpharma.com',
      phone: '+1-555-0200',
      website: 'www.genericpharma.com',
      address: '456 Distribution Ave',
      city: 'Philadelphia',
      state: 'PA',
      postalCode: '19101',
      country: 'USA',
      contactPerson: 'Michael Brown',
      paymentTerms: 'Net 30',
      organization: organization._id,
      products: [products[0]._id, products[2]._id],
    });

    const supplier2 = await Supplier.create({
      name: 'Health Supplements Inc',
      email: 'orders@healthsupp.com',
      phone: '+1-555-0300',
      website: 'www.healthsupp.com',
      address: '789 Wellness Blvd',
      city: 'Los Angeles',
      state: 'CA',
      postalCode: '90001',
      country: 'USA',
      contactPerson: 'Sarah Wilson',
      paymentTerms: 'Net 15',
      organization: organization._id,
      products: [products[1]._id, products[3]._id],
    });

    // Create Customers
    await Customer.insertMany([
      {
        firstName: 'Emma',
        lastName: 'Robinson',
        email: 'emma@email.com',
        phone: '+1-555-1001',
        address: '100 Main St',
        city: 'New York',
        state: 'NY',
        customerType: 'retail',
        totalPurchases: 250.50,
        loyaltyPoints: 25,
        organization: organization._id,
      },
      {
        firstName: 'David',
        lastName: 'Taylor',
        email: 'david@email.com',
        phone: '+1-555-1002',
        address: '200 Oak Ln',
        city: 'New York',
        state: 'NY',
        customerType: 'retail',
        totalPurchases: 180.75,
        loyaltyPoints: 18,
        organization: organization._id,
      },
      {
        firstName: 'Lisa',
        lastName: 'Anderson',
        email: 'lisa@email.com',
        phone: '+1-555-1003',
        address: '300 Pine Ave',
        city: 'New York',
        state: 'NY',
        customerType: 'retail',
        totalPurchases: 420.00,
        loyaltyPoints: 42,
        organization: organization._id,
      },
    ]);

    console.log('✓ Seed data created successfully');
    console.log('\n📋 Demo Credentials:');
    console.log('   Email: demo@nexacore.com');
    console.log('   Password: demo123456');

    process.exit(0);
  } catch (error) {
    console.error('✗ Seed failed:', error);
    process.exit(1);
  }
};

seedDatabase();
